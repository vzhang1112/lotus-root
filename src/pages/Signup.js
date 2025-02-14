import Auth from "../components/Auth.js"


function Signup() {

    return (
        <body class="body-default">
            {/* <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"> */}
            <div>
                <div className="w-full max-w-sm">
                    <Auth initialIsLogin={false}/>
                </div>
            </div>
        </body>
    );
}

export default Signup;