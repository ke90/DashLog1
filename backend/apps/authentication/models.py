from django.db import models
import uuid
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    confirmation_token = models.UUIDField(default=uuid.uuid4, editable=False)