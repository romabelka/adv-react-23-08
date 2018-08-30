import { connect } from 'react-redux';
import UsersComponent from './components';
import { bindActionCreators } from "redux";
import { userAdd } from '../../ducks/users/actions';

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

const mapDispatchToProps = (dispatch) => {
	return {
		userAdd: bindActionCreators(userAdd, dispatch)
	};
};

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default Users;