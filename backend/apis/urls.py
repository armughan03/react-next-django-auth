from django.urls import path
from . import views

urlpatterns = [
    path('all_users/' , views.getData,name='Users List'),
    path('all_users/' , views.getData,name='Users List'),
    path('users_stats/' , views.userStats,name='Users Stats'),
    path('user_details/' , views.userDetails,name='User Details'),
    path('update_user/' , views.updateUser,name='Update User'),
    path('deleteUser/' , views.deleteUser, name="Delete User from Database"),
]