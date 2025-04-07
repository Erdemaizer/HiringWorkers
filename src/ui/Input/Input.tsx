import { useState } from "react";
import styles from "./Input.module.scss";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

type InputProps = {
    name: string
    label?: string;
    type?: "text" | "password" | "email" | "tel";
    placeholder: string;
    value: string;
    errorMessage?: string,
    onChange: (value: string) => void;
    isRequired?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    autoComplete?: string,
};  

export const Input = ({
    name,
    label,
    type = "text",
    value,
    placeholder,
    errorMessage,
    onChange,
    isRequired = false,
    onBlur,
    onFocus,
    autoComplete
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`${styles.inputWrapper} `}>
            {label ? <p>{label}</p> : null}
            <input
                name={name}
                className={`${styles.input} ${errorMessage ? styles['input--error'] : null}`}
                type={type !== 'password' ? type : (type === 'password' && showPassword ? 'text' : 'password')}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={isRequired}
                onBlur={onBlur}
                onFocus={onFocus}
                autoComplete={autoComplete}
            />
            {type === "password" && (value?.length > 0) ? (
                !showPassword ? (
                    <EyeInvisibleOutlined className={styles.eyePic}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <EyeOutlined className={styles.eyePic}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )
            ) : null}
            {
                errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null
            }
        </div>
    );
};
