import { ProfileCard } from 'components/cards/profile'
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuthProfile } from 'store/auth/selectors';

function PageProfileContainer(props) {
    const {
        img,
        name,
        email,
        number,
        age,
        country,
        nat,
        locationPlace,
        isDataExist,
    } = props

    return (
        <ProfileCard
            img={img}
            nameTitle={name}
            email={email}
            age={age}
            country={country}
            street={locationPlace}
            nat={nat}
            number={number}
            title={"Profile"}
            isDataExist={isDataExist}
        />
    )
}

const mapStateToProps = (state) => {
    const profile = getAuthProfile(state)
    return {
        img: profile.picture["large"],
        name: profile.fullName,
        email: profile.email,
        number: profile.cell,
        age: profile.dob.age,
        country: profile.country,
        locationPlace: profile.locationPlace,
        nat: profile.nat,
        isDataExist: profile || false
    };
};

const mapDispatchToProps = {};

const PageProfile = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PageProfileContainer);

export { PageProfile };