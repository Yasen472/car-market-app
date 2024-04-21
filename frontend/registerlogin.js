return (
    <div className="register-page">
      <div className='registration-container'>
        <h3 className='register-header'>Registration</h3>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' value={email} onChange={handleEmailChange} />

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange} />

          <label htmlFor='rePassword'>Re-enter Password</label>
          <input type='password' id='rePassword' value={rePassword} onChange={handleRePasswordChange} />

          <button type='submit' className='register-btn'>Register</button>
        </form>
      </div>
      </div>
  );

  return (
    <div className="login-page">
      <div className='login-container'>
        <h3 className='login-header'>Login</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          <button type="submit" className='login-btn'>Login</button>
        </form>
      </div>
      </div>
  );