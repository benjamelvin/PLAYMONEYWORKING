
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
   path('', views.index),  
   path('signIn/', views.signIn),
   path('signUp/', views.signUp),
   path('signOut/', views.signOut),
   path('current_user', views.current_user),
   path('mainPage/', views.mainPage),
   path('search/', views.search),
   path('singleStockPage/', views.singleStockPage),
   path('getPortfolio/', views.getPortfolio),
   path('getWallet/', views.getWallet),
   path('getCurrent/', views.getCurrent),
   path('sell/<int:id>/', views.sell),
 


 

]