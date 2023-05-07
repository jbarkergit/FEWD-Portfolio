function Newsletter() {
  return (
    <form className="newsletter flexBox flexColumn">
      <h2>Keep in touch</h2>
      <div className="flexBox justifyCenter">
        <label className="newsletter__input flexBox">
          <input className="newsletter__input__field" type="email" name="email" placeholder="Enter email address..." />
        </label>
        <button className="newsletter__submit" type="submit">
          <h6>Submit Address</h6>
        </button>
      </div>
      <div className="newsletter__demoDisclaimer flexBox flexColumn">
        <h5>
          <mark>Privacy notice: for demo purposes only.</mark>
          <br />
          This input field is not a tied to a live marketing service. Any information provided will not be saved and/or
          stored via third party services, nor local databases.
        </h5>
      </div>
    </form>
  );
}

export default Newsletter;
