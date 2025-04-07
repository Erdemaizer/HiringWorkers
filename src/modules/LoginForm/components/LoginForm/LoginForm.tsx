import { useState } from "react";
import { Button } from "../../../../ui/Button/Button";
import { Input } from "../../../../ui/Input/Input";
import styles from "./LoginForm.module.scss";
import { UserLoginData } from "../../types/LoginRequestType";
import { Link } from "react-router-dom";
import { useGetApiRequestLoading } from "../../../../api/hooks/useGetApiRequestLoading";
import { login } from "../../api/loginRequest";
import { getErrors } from "../../../../api/errorHandler/axiosApiErrorHandler";

export const LoginForm = () => {
    const [loginForm, setLoginForm] = useState<UserLoginData>({
        email: "",
        password: "",
    });
    const [errorMessages, setErrorMessages] = useState<string[]>();

    const { makeRequest, loading } = useGetApiRequestLoading();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessages(undefined);

        try{
            await makeRequest(() => login(loginForm));
        }catch(e){
            const errorMessages = await getErrors(e);
            setErrorMessages(errorMessages);
        }
    }

    const handleInputChange =
        (field: keyof UserLoginData) => (value: string) => {
            setErrorMessages(undefined);
            setLoginForm((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Добро пожаловать</h1>
                <p className={styles.subTitle}>Войдите для продолжения</p>
                <Input
                    value={loginForm.email}
                    onChange={handleInputChange("email")}
                    name={"email"}
                    type={"email"}
                    placeholder={"Почта"}
                    isRequired
                />
                <Input
                    value={loginForm.password}
                    onChange={handleInputChange("password")}
                    name={"password"}
                    type={"password"}
                    placeholder={"Пароль"}
                    isRequired
                />
                <Button type={"submit"} text={"ВОЙТИ"} loading={loading}/>
                <p className={styles.bottomText}>Еще нет аккаунта? <Link to={'/registration'}>Зарегистрироваться</Link></p>
                {
                    errorMessages ? errorMessages.map((message) => <p className={styles.apiRequestErr} key={message}>{message}</p>) : undefined
                }
            </form>
        </div>
    );
};
