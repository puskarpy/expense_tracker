from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Transaction(models.Model):

    TRANSACTION_TYPES = (
        ("income", "Income"),
        ("expense", "Expense"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    description = models.TextField(blank=True)
    date = models.DateField(default=now)

    def __str__(self):
        return f"{self.type} : {self.amount}"