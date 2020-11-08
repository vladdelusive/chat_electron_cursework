import { ProfileCard } from 'components/cards/profile'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getContactProfile } from 'store/contacts/selectors';
import { fetchContacts } from 'store/contacts/actions';
function PageContactContainer(props) {
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
        fetchContacts,
    } = props

    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

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
            title={"Contact View"}
            isDataExist={isDataExist}
            returnBtn={true}
        />
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params["id"]
    const contact = getContactProfile(state, id)
    return contact ? {
        img: contact.picture["large"],
        name: contact.fullName,
        email: contact.email,
        number: contact.cell,
        age: contact.dob.age,
        country: contact.country,
        locationPlace: contact.locationPlace,
        nat: contact.nat,
        isDataExist: contact || false
    } : {}
};

const mapDispatchToProps = { fetchContacts };

const PageContact = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PageContactContainer);

export { PageContact };