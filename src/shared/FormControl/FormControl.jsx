import classNames from 'classnames';
import c from '../FormControl/FormControl.module.css';

export const ProfileInputForm = ({ input, meta, classes, ...props }) => {
  const { touched, error } = meta;
  return (
    <div>
      <input className={classNames(classes, { [c.error]: touched && error })} {...input} {...props} />
    </div>
  );
};
