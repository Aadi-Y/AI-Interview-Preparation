export const giveInitial = (role) => {
    const roleArray = role.split(" ");
    let initial = "";
    for(let i=0;i<roleArray.length;i++){
        initial = initial + roleArray[i].charAt(0).toUpperCase();
    }

    return initial;
}