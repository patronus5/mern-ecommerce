import { Fragment } from 'react'
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'
import { NavLink, Button } from 'reactstrap'
import PropTypes from 'prop-types'

const Logout = ({ logout }) => {
    return (
        <div>
            <Fragment>
                <Button color="danger" className="btn btn-sm">
                    <NavLink onClick={logout} href="#">
                        <span className="text-light"><b>Logout</b></span>
                    </NavLink>
                </Button>
            </Fragment>
        </div>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
