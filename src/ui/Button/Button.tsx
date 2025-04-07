import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Button.module.scss";

type ButtonProps = {
    type: "submit" | "button" | "reset";
    text: string;
    onClick?: () => void;
    loading?: boolean;
};

export const Button = ({
    type,
    text,
    onClick,
    loading = false,
}: ButtonProps) => {
    return (
        <div>
            <button
                className={`${styles.button}  ${
                    loading ? styles.disabled : null
                }`}
                type={type}
                onClick={onClick}
                disabled={loading}
            >
                {loading ? <LoadingOutlined spin className={styles.loader}/> : text}
            </button>
        </div>
    );
};
