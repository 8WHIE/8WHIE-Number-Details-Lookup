import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import phonenumbers
from phonenumbers import geocoder, carrier, timezone

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}) # Limit to specific origins in prod if necessary

# Configure Rate Limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

@app.route('/api/search', methods=['GET'])
@limiter.limit("10 per minute")
def search():
    num = request.args.get('number')

    if not num:
        return jsonify({
            "status": "error",
            "message": "Phone number is required."
        }), 400

    if not num.startswith('+'):
        num = '+' + num.strip()

    try:
        parsed_num = phonenumbers.parse(num, None)
    except phonenumbers.NumberParseException as e:
        return jsonify({
            "status": "error",
            "message": "Invalid phone number format."
        }), 400

    is_valid = phonenumbers.is_valid_number(parsed_num)

    if not is_valid:
         return jsonify({
            "status": "error",
            "message": "The provided phone number is not valid."
        }), 400

    region = geocoder.description_for_number(parsed_num, "en")
    network_carrier = carrier.name_for_number(parsed_num, "en")
    timezones = timezone.time_zones_for_number(parsed_num)

    intl_format = phonenumbers.format_number(parsed_num, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
    national_format = phonenumbers.format_number(parsed_num, phonenumbers.PhoneNumberFormat.NATIONAL)
    country_code = parsed_num.country_code
    region_code = phonenumbers.region_code_for_number(parsed_num)

    result_data = {
        "target_number": num,
        "valid": is_valid,
        "country_code": f"+{country_code}",
        "region_code": region_code,
        "region": region if region else "Unknown",
        "carrier": network_carrier if network_carrier else "Unknown",
        "timezones": list(timezones) if timezones else ["Unknown"],
        "international_format": intl_format,
        "national_format": national_format,
    }

    return jsonify({
        "status": "success",
        "developer": "8WHIE • Aryan Thakur",
        "result": result_data
    })

# Serve Frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
