from marshmallow import Schema, fields, validate, validates, ValidationError

class ContactSchema(Schema):
    firstName = fields.Str(validate=validate.Length(min=5, max=80), required=True)
    lastName = fields.Str(validate=validate.Length(min=5, max=80),required=True)
    email = fields.Email(required=True)

    @validates("email")
    def validate_email(self, email, **kwargs):
        if not email.endswith(".com"):
            raise ValidationError("Only emails with .com extension are allowed")

contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)
        