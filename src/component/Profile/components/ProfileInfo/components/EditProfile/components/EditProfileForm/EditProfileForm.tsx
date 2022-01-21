import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { VFC } from 'react'

import classes from '../EditProfileForm/EditProfileForm.module.css'
import { ProfileDataType } from '../../../../../../../../models';
import { ProfileInputForm } from '../../../../../../../common/FormControl/FormControl';
import { required } from '../../../../../../../common/validators/validators';

type EditProfileFormProps = {
    profile: ProfileDataType | null;
}

const Form: VFC<InjectedFormProps<ProfileDataType,EditProfileFormProps> & EditProfileFormProps> = ({ profile, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                <li className={classes.flex}>
                    <p className={classes.title}>Imię oraz nazwisko: </p>
                    <Field component={ProfileInputForm} name="fullName" type="text" validate={[required]} placeholder="Imię oraz nazwisko" classes={classes.input} />
                </li>
                <li className={classes.flex}>
                    <p className={classes.title}>O mnie: </p>
                    <Field component={ProfileInputForm} name="aboutMe" type="text" validate={[required]} placeholder="O mnie" classes={classes.input} />
                </li>
                <li className={classes.flex}>
                    <p className={classes.title}>Szukam pracy: </p>
                    <Field component="input" name="lookingForAJob" type="checkbox" />
                </li>
                <li className={classes.flex} >
                    <p className={classes.title}>Twoje umiejętności: </p>
                    <Field component={ProfileInputForm} name="lookingForAJobDescription" type="text" validate={[required]} placeholder="Twoje umiejętności" classes={classes.input} />
                </li>
                {profile && Object.keys(profile.contacts).map((contact) => {
                    return (
                        <li key={contact} className={classes.flex}>
                            <p className={classes.title}>{contact}: </p>
                            <Field component="input" name={`contacts.${contact}`} type="text" placeholder={`Link do ${contact}`} className={classes.input} />
                        </li>
                    )
                })}
                <div className="profile__btn-container--save">
                    <button className="profile__btn  profile__btn--edit  profile__btn--save" >Zapisz</button>
                </div>

            </ul>
        </form>
    )
};

export const EditProfileForm = reduxForm<ProfileDataType,EditProfileFormProps>({ form: 'edit-form' })(Form);

