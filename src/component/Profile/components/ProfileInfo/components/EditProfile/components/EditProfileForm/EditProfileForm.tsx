import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { VFC } from "react"
import { makeStyles } from "@mui/styles";

import { ProfileDataType } from '../../../../../../../../models';
import { ProfileInputForm } from '../../../../../../../common/FormControl/FormControl';
import { required } from '../../../../../../../common/validators/validators';


type EditProfileFormProps = {
    profile: ProfileDataType | null;
}

const useStyle = makeStyles({
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },

    lable: {
        width: '50%',
        fontWeight: '700',
        fontSize: '14px',
    },

    input: {
        border: 'none',
        borderBottom: '1px solid #D5D5D6',
    },

    buttonWrapper: {
        marginTop: '10px',
    },

    button: {
        width: '20%',
        padding: '8px 0',
        backgroundColor: '#5181B8',
        border: 'none',
        borderRadius:' 2px',
        color: '#fff',
        marginBottom: '10px',

       '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#6A98CC',
        }
    }
})

const Form: VFC<InjectedFormProps<ProfileDataType,EditProfileFormProps> & EditProfileFormProps> = ({ profile, handleSubmit }) => {
    const classes = useStyle();
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                <li className={classes.inputWrapper}>
                    <p className={classes.lable}>Imię oraz nazwisko: </p>
                    <Field component={ProfileInputForm} name="fullName" type="text" validate={[required]} placeholder="Imię oraz nazwisko" classes={classes.input} />
                </li>
                <li className={classes.inputWrapper}>
                    <p className={classes.lable}>O mnie: </p>
                    <Field component={ProfileInputForm} name="aboutMe" type="text" validate={[required]} placeholder="O mnie" classes={classes.input} />
                </li>
                <li className={classes.inputWrapper}>
                    <p className={classes.lable}>Szukam pracy: </p>
                    <Field component="input" name="lookingForAJob" type="checkbox" />
                </li>
                <li className={classes.inputWrapper} >
                    <p className={classes.lable}>Twoje umiejętności: </p>
                    <Field component={ProfileInputForm} name="lookingForAJobDescription" type="text" validate={[required]} placeholder="Twoje umiejętności" classes={classes.input} />
                </li>
                {profile && Object.keys(profile.contacts).map((contact) => {
                    return (
                        <li key={contact} className={classes.inputWrapper}>
                            <p className={classes.lable}>{contact}: </p>
                            <Field component="input" name={`contacts.${contact}`} type="text" placeholder={`Link do ${contact}`} className={classes.input} />
                        </li>
                    )
                })}
                <div className={classes.buttonWrapper}>
                    <button className={classes.button}>Zapisz</button>
                </div>

            </ul>
        </form>
    )
};

export const EditProfileForm = reduxForm<ProfileDataType,EditProfileFormProps>({ form: 'edit-form' })(Form);

