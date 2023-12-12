from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseServerError
from django.core.mail import send_mail
import json
from django.contrib.auth import login as django_login, authenticate
from django.contrib.auth import logout
import jwt
from django.contrib.auth.models import User
from .models import UserProfile
import string
import secrets
from google.oauth2 import id_token
from google.auth.transport import requests
from classes.Dbconnection import MYSQL


GOOGLE_CLIENT_ID = '110008352861-vbatp22jdk4om0l59hrjbhqv43o659em.apps.googleusercontent.com'
dbconnection = MYSQL()

# Create your views here.
SECRET_JWT = '41HamddmPKndm!da(=da)'
@csrf_exempt
def loginUser(request):
    print('Check USER läuft...')

    # status = 200 #Authorisiert
    # status = 201 #Created
    # status = 400 #Bad Request -> ungültige anmeldeInfos
    # status = 404 #Not Found

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email', '')
        password = data.get('password', '')
        user = authenticate(request, username=email, password=password)
        print("Authentifizung nach Login")
        print(user)
        print('-------------------')
        if user is not None:
            data = crerateToken(user)

            return JsonResponse({'data':data['authDetails'], 'token': data['token']},status=200)
        else:
            return JsonResponse({},status=400)

    return JsonResponse({},status=400)

@csrf_exempt
def reg(request):

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        user_name = data.get('user_name', '')
        user_first_name = data.get('user_first_name', '')
        email = data.get('email', '')
        password = data.get('password', '')

        if User.objects.filter(username=email).exists() or User.objects.filter(email=email).exists():
            return JsonResponse({},status=400)

        user = User.objects.create_user(username=email, email=email, password=password)
        
        user.first_name = user_first_name
        user.last_name = user_name
        user.save()

        user_profile = UserProfile.objects.create(user=user)
        user_profile.save()

        if user is not None:
            user = authenticate(request, username=email, password=password)
            data = crerateToken(user)

            return JsonResponse({'data':data['authDetails'], 'token': data['token']},status=200)

        else:
            return JsonResponse({},status=500)

    return JsonResponse({},status=400)

@csrf_exempt
def logoutUser(request):
    logout(request)

    if not request.user.is_authenticated:
        return JsonResponse({},status=200)
    else:
        return JsonResponse({},status=400)
    
@csrf_exempt   
def loginToken(request):
    #TODO: Auf der linken Box unter der Profilbox muss noch Details zum Vertrag hinterlegt werden
    if 'HTTP_AUTHORIZATION' in request.META:
        auth_header = request.META['HTTP_AUTHORIZATION']
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]
            try:
                payload = jwt.decode(token, SECRET_JWT, algorithms=['HS256'])
                user_id = payload.get('user_id')
                print("Start authentifizierung durch Token")
                print("UserID aus dem Token " + str(user_id))
                print('----')
                if user_id:
                    user = User.objects.get(pk=user_id)
                    django_login(request,user)

                    authDetails = {}
                    authDetails['user_id'] = user.id
                    authDetails['user_email'] = user.email
                    authDetails['user_name'] = user.last_name if user.last_name else ''
                    authDetails['user_first_name'] = user.first_name if user.first_name else ''
                    if request.user.is_authenticated:
                        print("User durch Token authentifiziert mit der ID " + str(user.id))
                        print("--------------------------------")
                    


                    return JsonResponse({'data':authDetails}, status=200)
                else:
                    return JsonResponse({})
            except jwt.ExpiredSignatureError:
                return JsonResponse({})

    return JsonResponse({},status=400)

@csrf_exempt
def changeUser(request):
    #TODO: prüfen ob emailadresse schon vorhanden

    if 'HTTP_AUTHORIZATION' in request.META:
        auth_header = request.META['HTTP_AUTHORIZATION']
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]
            print(token)

        if request.method == 'POST':
            payload = jwt.decode(token, SECRET_JWT, algorithms=['HS256'])
            user_id = payload.get('user_id')

            data = json.loads(request.body.decode('utf-8'))
            user_name = data.get('lastName', '')
            user_first_name = data.get('firstName', '')
            email = data.get('email', '')
            password = data.get('password', '')
            password2 = data.get('password2', '')

            user = request.user
            print(user)

            if user_id:
                print("auth")
                try:
                    user = User.objects.get(pk=user_id)
                    print("Authentifizierter Benutzer:", user)

                    user.first_name = user_first_name
                    user.last_name = user_name
                    user.email = email
                    user.username = email

                    if password and password == password2:
                        user.set_password(password)

                    user.save()

                    data = crerateToken(user)

                    return JsonResponse({'data':data['authDetails'], 'token': data['token']},status=200)
                except User.DoesNotExist:
                    return JsonResponse({})
            else:
                print("ChangeUsesr im Elsefall")
                return JsonResponse({})
    return JsonResponse({})


def crerateToken(user):
    print("CreateTokenFunktion")
    
    authDetails = {}
    authDetails['user_id'] = user.id
    authDetails['user_email'] = user.email
    authDetails['user_name'] = user.last_name if user.last_name else ''
    authDetails['user_first_name'] = user.first_name if user.first_name else ''
    token = jwt.encode(authDetails, SECRET_JWT, algorithm='HS256').decode('utf-8')

    data = {
        "authDetails": authDetails,
        "token": token
        }
    return data


    # send_mail(
    # 'Subject',  # Betreff
    # 'Message',  # Nachricht
    # 'from@example.com',  # Absender
    # ['to@example.com'],  # Empfänger
    # fail_silently=False,
    # )
@csrf_exempt
def googleLogin(request):
    # if request.method == 'POST':
    #     print(request.POST)
    #     credential = request.POST['credential'] if request.POST['credential'] != 'null' else None
    #     if credential:
    #         print(credential)

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        credential = data.get('credential')
        idinfo = id_token.verify_oauth2_token(credential, requests.Request())
        email = idinfo['email']

        if credential:
            # Logik für Google Authentifizierung
            try:
                user = User.objects.get(email=email)
                if user:

                    django_login(request, user)

                    data = crerateToken(user)
                    print(data)

                    return JsonResponse({'data':data['authDetails'], 'token': data['token']},status=200)
                else:
                    return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
            except User.DoesNotExist:
                # Erstelle einen neuen Benutzer mit einem zufälligen Passwort
                secure_password = generate_password(20)
                user = User.objects.create_user(username=email, email=email, password=secure_password)
                if user:
                    django_login(request, user)
                    data = crerateToken(user)

                    return JsonResponse({'data':data['authDetails'], 'token': data['token']},status=200)
                else:
                    return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'status': 'error', 'message':'Error in sending the data'}, status=401)

@csrf_exempt
def facebookLogin(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        access_token = data.get('access_token')

        if access_token:
            # Hier überprüfen Sie das Access-Token mit der Facebook Graph API
            try:
                user_info_response = requests.get(f'https://graph.facebook.com/me?fields=id,name,email&access_token={access_token}')
                user_info = user_info_response.json()

                if 'email' in user_info:
                    email = user_info['email']
                    # Überprüfen Sie, ob ein Benutzer mit dieser E-Mail bereits existiert
                    try:
                        user = User.objects.get(email=email)
                        # Benutzer existiert, führen Sie den Login durch
                        django_login(request, user)
                        data = crerateToken(user)  # Ihre Funktion zum Erstellen eines Tokens

                        return JsonResponse({'data': data['authDetails'], 'token': data['token']}, status=200)
                    except User.DoesNotExist:
                        # Kein Benutzer gefunden, erstellen Sie einen neuen Benutzer
                        secure_password = generate_password(20)  # Ihre Funktion zum Erstellen eines sicheren Passworts
                        user = User.objects.create_user(username=email, email=email, password=secure_password)
                        django_login(request, user)
                        data = crerateToken(user)

                        return JsonResponse({'data': data['authDetails'], 'token': data['token']}, status=200)
                else:
                    return JsonResponse({'status': 'error', 'message': 'Email not found in Facebook data'}, status=401)
            except requests.RequestException as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=401)
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid or missing access token'}, status=401)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

def generate_password(length):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for _ in range(length))
    return password

