import Auth from "../components/Auth.js"


function Login() {

    return (
        <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            <Auth initialIsLogin={true}/>
        </div>
        </div>
    );
}

export default Login;