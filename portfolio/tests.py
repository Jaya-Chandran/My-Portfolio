from django.test import TestCase, Client
from .models import Contact

class PortfolioViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_index_view(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Jaya Chandran")
        self.assertContains(response, "Python / Django Full Stack Developer")
        self.assertContains(response, "hero3dCanvas")
        self.assertContains(response, "techGlobeCanvas")

    def test_contact_submission(self):
        response = self.client.post('/contact/', {
            'name': 'Recruiter Test',
            'email': 'recruiter@example.com',
            'number': '9876543210',
            'content': 'Great 3D portfolio! We would love to chat.'
        })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Contact.objects.count(), 1)
        contact = Contact.objects.first()
        self.assertEqual(contact.name, 'Recruiter Test')
        self.assertEqual(contact.email, 'recruiter@example.com')
