"""
Python Backend Email Service for Scrollfolio Portfolio
Handles email form submissions with validation and security
"""

import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any, Optional
from dataclasses import dataclass
from flask import Flask, request, jsonify
from flask_cors import CORS
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class EmailConfig:
    """Email configuration settings"""
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    sender_email: str = "nico.code.evo@gmail.com"
    app_password: str = os.getenv("EMAIL_APP_PASSWORD", "")
    recipient_email: str = "nico.code.evo@gmail.com"

class EmailValidator:
    """Email validation utilities"""
    
    @staticmethod
    def is_valid_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_form_data(data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate form submission data"""
        errors = {}
        
        # Name validation
        name = data.get('name', '').strip()
        if not name or len(name) < 2:
            errors['name'] = 'Name must be at least 2 characters long'
        elif len(name) > 50:
            errors['name'] = 'Name must be less than 50 characters'
        
        # Email validation
        email = data.get('email', '').strip()
        if not email:
            errors['email'] = 'Email is required'
        elif not EmailValidator.is_valid_email(email):
            errors['email'] = 'Please enter a valid email address'
        
        # Message validation
        message = data.get('message', '').strip()
        if not message or len(message) < 10:
            errors['message'] = 'Message must be at least 10 characters long'
        elif len(message) > 1000:
            errors['message'] = 'Message must be less than 1000 characters'
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors
        }

class EmailService:
    """Main email service class"""
    
    def __init__(self, config: Optional[EmailConfig] = None):
        self.config = config or EmailConfig()
        self.validator = EmailValidator()
    
    def send_email(self, form_data: Dict[str, Any]) -> Dict[str, Any]:
        """Send email with form data"""
        try:
            # Validate form data
            validation_result = self.validator.validate_form_data(form_data)
            if not validation_result['is_valid']:
                return {
                    'success': False,
                    'message': 'Validation failed',
                    'errors': validation_result['errors']
                }
            
            # Create email message
            msg = MIMEMultipart()
            msg['From'] = self.config.sender_email
            msg['To'] = self.config.recipient_email
            msg['Subject'] = f"Portfolio Contact: {form_data['name']}"
            
            # Email body
            body = f"""
New contact form submission from your portfolio:

Name: {form_data['name']}
Email: {form_data['email']}

Message:
{form_data['message']}

---
Sent from: Scrollfolio Portfolio Contact Form
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            with smtplib.SMTP(self.config.smtp_server, self.config.smtp_port) as server:
                server.starttls()
                server.login(self.config.sender_email, self.config.app_password)
                server.send_message(msg)
            
            logger.info(f"Email sent successfully from {form_data['email']}")
            
            return {
                'success': True,
                'message': 'Email sent successfully!'
            }
            
        except smtplib.SMTPAuthenticationError:
            logger.error("SMTP authentication failed")
            return {
                'success': False,
                'message': 'Email service authentication failed'
            }
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error: {str(e)}")
            return {
                'success': False,
                'message': 'Failed to send email. Please try again later.'
            }
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return {
                'success': False,
                'message': 'An unexpected error occurred'
            }

# Flask API endpoints
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize email service
email_service = EmailService()

@app.route('/api/send-email', methods=['POST'])
def send_email():
    """API endpoint to send email"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        result = email_service.send_email(data)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
            
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Server error occurred'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Scrollfolio Email Service',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    # Check if email configuration is set
    if not email_service.config.app_password:
        logger.warning("EMAIL_APP_PASSWORD environment variable not set!")
        logger.info("Set the EMAIL_APP_PASSWORD environment variable to enable email sending")
    
    # Run Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)
