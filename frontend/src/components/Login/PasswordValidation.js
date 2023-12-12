import React from 'react';

function PasswordValidation({ password }) {
  // Überprüfen Sie hier die Passwortanforderungen und speichern Sie die Fehlermeldungen in einem Array
  const validationErrors = [];

  if (password.length < 8) {
    validationErrors.push('Das Passwort muss mindestens 8 Zeichen lang sein.');
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    validationErrors.push('Das Passwort muss jeweils kleine und große Buchstaben enthalten.');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    validationErrors.push('Das Passwort muss mindestens ein Sonderzeichen enthalten.');
  }

  return (
    <div className='mt-4'>
      {validationErrors.map((error, index) => (
        <div key={index} className="text-danger">
          {error}
        </div>
      ))}
    </div>
  );
}

export default PasswordValidation;