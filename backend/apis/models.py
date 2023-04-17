from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None,is_superuser=False, **extra_fields):
        if not email:
            raise ValueError("Please enter email")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        user.is_staff = is_superuser
        user.is_superuser = is_superuser

        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password=None):
        
        user = self.create_user(
            email,
            name,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, default="", blank=True)
    # partial_password = models.BooleanField(default=True)
    # firstname = models.CharField(max_length=255)
    # lastname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    is_active = models.IntegerField(default=1)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    role = models.IntegerField(default=1)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password', 'is_superuser'] 

    def get_full_name(self):
        return self.name