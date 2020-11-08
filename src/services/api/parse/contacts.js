export const parseContactsList = (response) => {
    response.data.results = response.data.results.map((contact, indx) => {
        const { name, location } = contact;
        contact.id = indx + 1;
        const nameTitle = name["title"] ?? (contact.gender ? (contact.gender === "male" ? "Mr" : "Ms") : "Indeterminate")
        contact.fullName = `${nameTitle}. ${name["first"]} ${name["last"]}`
        contact.country = location.country || " Unknown country";
        contact.locationPlace = `${location?.street?.number || ""} ${location?.street?.name || ""}, ${location?.city || ""}, ${location?.state || ""} ${location?.postcode || ""}`
        return contact
    })
    return response.data
}