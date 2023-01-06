from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from . models import *
from rest_framework.response import Response
import requests
from decimal import Decimal
import json
import os
from dotenv import load_dotenv
load_dotenv()

# from requests_oauthlib import OAuth1

# Create your views here.

def index(request):
    # print('index')
    homepage = open('static/index.html').read()
    return HttpResponse(homepage)
@api_view(['POST'])
def signIn(request):
    # print(request.user)
   
    email=request.data['email']
    password=request.data['password']
    user = authenticate(username=email, password=password)
    
    
    if user.is_active and user is not None:
        try:
            login(request, user)
            # print(request.user)
            return JsonResponse({'success': True })
        except Exception as e:
            print(e)
            return JsonResponse({'success': False})
    else:
        JsonResponse({'success': False})

@api_view(['GET'])
def current_user(request):
    # print('what',request.user)
 
    if request.user.is_authenticated:
        data=serializers.serialize('json', [request.user], fields=['email'])
        
        return HttpResponse(data)
    else:
        return JsonResponse({'user': None})




      

@api_view(['POST'])
def signUp(request):
    # print(request.user)
    email=request.data['email']
    password=request.data['password']
    try:
        AppUser.objects.create_user(username=email, email=email, password=password)
       
        return JsonResponse({'signup': True})
    except Exception as e:
        print(e)
        return JsonResponse({'signup': False})


def signOut(request):
    try:
        logout(request)
        return JsonResponse({'signout':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signout':False})

@api_view(["GET"])
def mainPage(request):
   holder =[]
   endpoint = f"https://tradestie.com/api/v1/apps/reddit"
   response = requests.get(endpoint)
   response_json = response.json()
   for i in response_json:
    ticker=i['ticker']
    sentiment=i['sentiment']
    data = {
        'ticker': ticker,
        'sentiment': sentiment
    }
    holder.append(data)
    return Response({'data': response_json})

@api_view(["POST"])
def search(request):
    stock = request.data['stock']
    holder =[]
    endpoint1 = f"https://api.twelvedata.com/price?symbol={stock}&apikey={os.environ['key1']}"
    response = requests.get(endpoint1)
    response_json = response.json()
    price = response_json.get('price')
    endpoint2 = f"https://api.twelvedata.com/quote?symbol={stock}&apikey={os.environ['key1']}"
    response2 = requests.get(endpoint2)
    response_json2 = response2.json()
    endpoint3 = f"https://api.twelvedata.com/logo?symbol={stock}&apikey={os.environ['key1']}"
    response3 = requests.get(endpoint3)
    response_json3 = response3.json()
    endpoint4 = f"https://api.marketaux.com/v1/news/all?symbols={stock}&filter_entities=true&language=en&api_token={os.environ['key2']}"
    response4 = requests.get(endpoint4)
    response_json4 = response4.json()
    title = response_json4['data'][0]['title']
    image_url = response_json4['data'][0]['image_url']
    link = response_json4['data'][0]['url']
    title1 = response_json4['data'][1]['title']
    image_url1 = response_json4['data'][1]['image_url']
    link1 = response_json4['data'][1]['url']
    
    
    
   
 
    logo = response_json3.get('url')
    
    symbol = response_json2.get('symbol')
    name = response_json2.get('name')
    datetime = response_json2.get('datetime')
    open = response_json2.get('open')
    high = response_json2.get('high')
    low = response_json2.get('low')
    close = response_json2.get('close')
    previos_close = response_json2.get('previous_close')
    dic2 = response_json2.get('fifty_two_week')
    low52 = dic2.get('low')
    high52 = dic2.get('high')
    range = dic2.get('range')
    data = {
        'logo' : logo,
        'price' : price,
        'symbol' : symbol,
        'name' : name,
        'datetime' : datetime,
        'open' : open,
        'high' : high,
        'low' : low,
        'close' : close,
        'previous_close' : previos_close,
        'low52' : low52,
        'high52' : high52,
        'range' : range,
        'title' : title,
        'image_url': image_url,
        'link': link,
        'title1' : title1,
        'image_url1': image_url1,
        'link1': link1

    }
    holder.append(data)
    return Response({'data': holder})


@api_view(["POST"])
def singleStockPage(request):
    # print('bueller')
    if request.method == 'POST':
        buyprice =request.data['price']
        symbol=request.data['symbol']
        quantity=request.data['quantity']
        date = request.data
        print(date)
        
        buyprice= float(buyprice)
        buyprice=Decimal(buyprice)
        buyprice=round(buyprice, 2)
        totalcost = buyprice * int(quantity)
        # print(totalcost)
        # totalcost = float(totalcost)
        curr_bal = Wallet.objects.get(owner = request.user)
        curr_bal.amount -= totalcost
        curr_bal.save()
        # print(curr_bal.amount)
        # owner = AppUser.objects.get(id=request.user.id)
        Portfolio.objects.create(symbol=symbol,buyprice=buyprice, totalcost=totalcost,quantity=quantity, date=date, owner=request.user )
        return JsonResponse({'bought': True})
  
    elif request.method == 'DELETE':
        deleted=Portfolio.objects.get(owner = request.user)
        deleted.delete()
        return JsonResponse({'success': True, 'id': id})

@api_view(['GET'])
def getPortfolio(request):
    user =request.user
    portfolio = Portfolio.objects.filter(owner= user)
    # print(portfolio)

    data = serializers.serialize('json', portfolio)
    # print(data)
    # print(data)
    return HttpResponse(data)

@api_view(['GET'])
def getWallet(request):
    my_wallet, _= Wallet.objects.get_or_create(owner=request.user)
    
    if _ == False:
        wallet = Wallet.objects.filter(owner= request.user)
        data = serializers.serialize('json', wallet)
        return HttpResponse(data)
@api_view(['GET'])
def getCurrent(request):
    # print('hii')
    total=0
    holder =[]
    
    my_stocks = Portfolio.objects.filter(owner=request.user).values('symbol', 'quantity')
    for stocks in my_stocks:
        # print(stocks['symbol'])
        endpoint1 = f"https://api.twelvedata.com/price?symbol={stocks['symbol']}&apikey={os.environ['key1']}"
        response = requests.get(endpoint1)
        response_json = response.json()
        newb = float(response_json['price'])
       
        # print(newb)
        market_values = newb *int(stocks["quantity"])
        market_values = round(market_values, 2)
        total+= market_values
        # print(type(total))
        
    
        holder.append(market_values )
   
        # holder.append(stocks['quantity'])
    return Response({'data': holder, 'total': total})
    # price = response_json.get('price')
# @api_view([''])  
# def sell(request):
#     print('sell')
@api_view(['PUT', 'DELETE'])
def sell(request, id):
    # print(id)
    the_stock = Portfolio.objects.filter(id=id).values()
    
    for i in the_stock:
        symbol=i['symbol']
        totalcost = i['totalcost']
        owner = i['owner_id']
        quantity = i['quantity']
        buyprice = i['buyprice']
    
        endpoint1 = f"https://api.twelvedata.com/price?symbol={symbol}&apikey={os.environ['key1']}"
        response = requests.get(endpoint1)
        response_json = response.json()
        # print(response_json)
        newb = Decimal(response_json['price'])
        if request.method == 'DELETE':
            newTotal = newb * int(quantity)
            add =round(newTotal, 2)
            wall_to_add_to = Wallet.objects.get(owner = owner)
            # print(wall_to_add_to)
            wall_to_add_to.amount += add
            
            Wallet.save(wall_to_add_to)
            deleted=Portfolio.objects.get(id=id)
            deleted.delete()
            return JsonResponse({'success': True})
        elif request.method == 'PUT':
            input_quantity = request.data['quantity']
            amount_to_sub = newb *int(input_quantity)
            # print(amount_to_sub)
            final = round(amount_to_sub, 2)
            curr_stock = Portfolio.objects.get(id=id)
            if curr_stock.quantity < int(input_quantity):
                # print('nope')
                return HttpResponse('<h1>INVALID REQUEST</h1>')
            else:
                curr_stock.quantity -= int(input_quantity)
                Portfolio.save(curr_stock)
                wall_to_update = Wallet.objects.get(owner = owner)
                wall_to_update.amount += final
                Wallet.save(wall_to_update)
                
                curr_stock.totalcost -= final
                Portfolio.save(curr_stock)
            
                
                return JsonResponse({'success': True})

