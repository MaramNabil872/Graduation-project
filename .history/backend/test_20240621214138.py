

    # Validate input data
    if not data.get('first_name') or not data.get('last_name') or not data.get('email') or not data.get('password') or not data.get('phone_number'):
        return jsonify({'error': 'Invalid input data'}), 400

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    # Generate OTP
    otp = "".join(str(random.randint(0, 9)) for _ in range(6))

    # Send OTP via email
    from_mail = "dishdashh05@gmail.com"

    to_mail = data['email']
    password = "wjqg nfyo pprd guaz"
    subject = "DishDash OTP Verification"
    body = f"Here is Your OTP please don't share it with anyone: {otp}"

    if not send_email(data['email'], subject, body):
        return jsonify({'error': 'Failed to send OTP'}), 500

    # Hash password and create new user
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=hashed_password,
        phone_number=data['phone_number'],
        address='',  # Initialize address as empty string
        otp=otp )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully! OTP sent to your email.'}), 201

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)