function LoginForm () {
  return (
    <div className="flex flex-col gap-y-5 justify-center item-center">
        <h2 className=" flex justify-center item-center text-xl font-bold">Login</h2>
        <input type="text" placeholder="Type here" className="input input-bordered bg-primary-content w-full max-w-xs" />
        <input type="text" placeholder="Type here" className="input input-bordered bg-primary-content w-full max-w-xs" />
        <button className="btn no-animation">Login</button>
        <p>you don't have an account! <a href=" " className="text-neutral">SignUp</a></p>
    </div>
  )
}
export default LoginForm;