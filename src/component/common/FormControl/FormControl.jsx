import classNames from 'classnames'
import c from '../FormControl/FormControl.module.css'
import errorSVG from '../../../assests/error.svg'

export const InputLogin = ({ input, meta, className, ...props }) => {
    console.log('input', input);
    const { touched, error } = meta
    return (
        <div className={`login__input ${className}`}>
            <input className={classNames("login__inputText", { 'login__inputText--error': touched && error })}  {...input} {...props} />
            { touched && error &&
                <div className="login__error">
                    <img className="logo__errorIcon" src={errorSVG} alt="error" />
                    <p className="login__errorText">
                        {error}
                    </p>
                </div>
            }

        </div>
    )
}



export const CheckBoxLogin = ({ input, meta, ...props }) => {
    return (
        <div className="login__checkbox">
            <input id="checkbox" className="login__inputCheckbox"{...input} {...props} />
            <label className="login__checkboxLabel" htmlFor="checkbox">Zapamiętaj mnie</label>
        </div>
    )
}

export const ProfileInputForm = ({ input, meta, classes, ...props }) => {
    const { touched, error } = meta
    return (
        <div>
            <input className={classNames(classes, { [c.error]: touched && error })} {...input} {...props} />
        </div>
    )
}