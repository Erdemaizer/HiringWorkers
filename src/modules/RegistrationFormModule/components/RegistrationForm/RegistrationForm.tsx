import { useState } from "react";
import { Button } from "../../../../ui/Button/Button";
import { Input } from "../../../../ui/Input/Input";
import { UserRegistrationData } from "../../types/RegistrationRequestType";
import { register } from "../../api/registrationRequest";
import styles from "./RegistrationForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useGetApiRequestLoading } from "../../../../api/hooks/useGetApiRequestLoading";
import { getErrors } from "../../../../api/errorHandler/axiosApiErrorHandler";

type Errors = {
    passwordMsg?: string;
};

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState<string[]>();
    const { makeRequest, loading } = useGetApiRequestLoading();

    const [registrationForm, setRegistrationForm] =
        useState<UserRegistrationData>({
            email: "",
            password: "",
            repeatPassword: "",
            firstName: "",
            secondName: "",
            patronymic: "",
            phoneNumber: "",
        });
    const [inputErrors, setInputErrors] = useState<Errors>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessages(undefined);

        if (!arePasswordsValid()) {
            return;
        }

        try {
            await makeRequest(() => register(registrationForm));
            navigate(`/login`, { replace: true});
        } catch (e) {
            const errorMessages = await getErrors(e);
            setErrorMessages(errorMessages);
        }
    };

    const handleInputChange =
        (field: keyof UserRegistrationData) => (value: string) => {
            setErrorMessages(undefined);
            setRegistrationForm((prev) => ({
                ...prev,
                [field]: value,
            }));

            if (inputErrors?.passwordMsg) {
                setInputErrors({ passwordMsg: undefined });
            }
        };

    const arePasswordsValid = () => {
        if (registrationForm.password !== registrationForm.repeatPassword) {
            setInputErrors({ passwordMsg: "Пароли должны совпадать" });
            return false;
        }
        return true;
    };

    const handlePasswordBlur = () => {
        arePasswordsValid();
    };

    return (
        <div className={styles.formWrapper}>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className={styles.form}
            >
                <h1 className={styles.title}>Регистрация</h1>
                <p className={styles.subTitle}>Зарегистрируйте аккаунт</p>
                <Input
                    name={"lastName"}
                    placeholder="Фамилия"
                    value={registrationForm.secondName}
                    onChange={handleInputChange("secondName")}
                    isRequired={true}
                />
                <Input
                    name={"firstName"}
                    placeholder="Имя"
                    value={registrationForm.firstName}
                    onChange={handleInputChange("firstName")}
                    isRequired={true}
                />
                <Input
                    name={"patronymic"}
                    placeholder="Отчество"
                    value={registrationForm.patronymic}
                    onChange={handleInputChange("patronymic")}
                    isRequired={true}
                />
                <Input
                    name={"phoneNumber"}
                    type={"tel"}
                    value={registrationForm.phoneNumber}
                    onChange={handleInputChange("phoneNumber")}
                    placeholder="Номер телефона"
                    isRequired={true}
                />
                <Input
                    name={"email"}
                    type={"email"}
                    placeholder="Почта"
                    value={registrationForm.email}
                    onChange={handleInputChange("email")}
                    isRequired={true}
                />
                <Input
                    name={"password"}
                    type={"password"}
                    placeholder="Пароль"
                    value={registrationForm.password}
                    onChange={handleInputChange("password")}
                    onBlur={handlePasswordBlur}
                    errorMessage={inputErrors?.passwordMsg}
                    isRequired={true}
                    autoComplete="new-password"
                />
                <Input
                    name={"repeatPassword"}
                    type={"password"}
                    placeholder="Повторите пароль"
                    value={registrationForm.repeatPassword}
                    onChange={handleInputChange("repeatPassword")}
                    onBlur={handlePasswordBlur}
                    errorMessage={inputErrors?.passwordMsg}
                    isRequired={true}
                    autoComplete="new-password"
                />
                <Button
                    type={"submit"}
                    text="ЗАРЕГИСТРИРОВАТЬСЯ"
                    loading={loading}
                />
                <p className={styles.bottomText}>
                    Уже есть аккаунт? <Link to={"/login"}>Войти</Link>
                </p>
                {errorMessages
                    ? errorMessages.map((errorMessage) => (
                          <p
                              className={styles.apiRequestErr}
                              key={errorMessage}
                          >
                              {errorMessage}
                          </p>
                      ))
                    : undefined}
            </form>
        </div>
    );
};
