import Input from "../utils/Input";
function LoginForm() {
    return (
        <form className="space-y-6">
            <Input label="EMAIL" placeholder="Enter your email" />

            <Input
                label="PASSWORD"
                type="password"
                placeholder="Enter your password"
            />

            <button
                type="submit"
                className="bg-[#D93F68] px-8 py-3 text-white shadow-md transition hover:scale-105"
            >
                LOGIN
            </button>
        </form>
    );
}
export default LoginForm;