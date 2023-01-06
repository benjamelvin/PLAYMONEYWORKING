from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.


class AppUser(AbstractUser):
    email = models.EmailField(
        max_length=64,
        unique=True
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Portfolio(models.Model):
    symbol = models.CharField(max_length=10)
    buyprice = models.DecimalField(max_digits=254, decimal_places=4)
    totalcost = models.DecimalField(max_digits=254, decimal_places=2, null=True)
    quantity = models.IntegerField()
    date = models.DateField(auto_now_add=True) 
    owner = models.ForeignKey(
        AppUser, related_name="portfolio", on_delete=models.CASCADE, null=True)


class Wallet(models.Model):
    amount = models.DecimalField(default=100000.00, max_digits = 254, decimal_places = 2 )

    owner= models.OneToOneField(
            AppUser, related_name="wallet", on_delete=models.CASCADE, null=True)
    
   

