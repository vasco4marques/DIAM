from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase

class UserRegistrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'password': 'securepassword123'
        }
        self.response = self.client.post(
            reverse('register'),
            self.user_data,
            format='json'
        )

    def test_registration_success(self):
        """ Testa se a criação do usuário é bem-sucedida e retorna status 201 """
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_registration_failure(self):
        """ Testa falha na criação do usuário devido a dados incompletos """
        response = self.client.post(
            reverse('register'),
            {'username': 'testuser2'},  # Senha faltando
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
