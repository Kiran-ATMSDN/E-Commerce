const Registration = () => {
  return (
    <>
      <div className="container w-50">
        <form action="localhost://3000/addUsers" method="post">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="txtName"
              name="name"
              className="form-control"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="txtEmail"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div>
            <label for="gender" className="form-label">
              Gender
            </label>
            <select name="gender" id="txtGender" className="form-control w-25">
              <option value="" disabled selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="birthDate" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              name="birth_date"
              id="txtBirthDate"
              className="form-control w-25"
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNo" className="form-label">
              Mobile Number
            </label>
            <input
              type="number"
              name="mobile_no"
              id="txtMobNo"
              className="form-control"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="w3review"
              name="w3review"
              className="form-control"
              rows="2"
              cols="30"
            ></textarea>
          </div>
          <div>
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="txtCity"
              className="form-control"
              required
            />
          </div>
          <div>
            <label htmlFor="pin_code" className="form-label">
              Pin Code
            </label>
            <input
              type="number"
              name="pin_code"
              id="txtPinCode"
              className="form-control"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="txtPassword"
              className="form-control"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-info mt-4"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
