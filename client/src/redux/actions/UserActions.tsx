
export enum EUserActions {


    CHANGE_EMAIL ='CHANGE_EMAIL'

}

export function changeUser(email : string) {

    return {

        type: EUserActions.CHANGE_EMAIL,
        email,

    }
}