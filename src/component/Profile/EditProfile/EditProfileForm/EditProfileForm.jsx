import React from 'react'
import { Field, reduxForm } from 'redux-form'
import classes from '../EditProfileForm/EditProfileForm.module.css'
import { required } from '../../../../component/common/validators/validators'
import { ProfileInputForm } from '../../../common/FormControl/FormControl'
function EditProfileForm({ profile, handleSubmit }) {
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
                {Object.keys(profile.contacts).map((contact) => {
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
}

export default reduxForm({ form: 'edit-form' })(EditProfileForm)
