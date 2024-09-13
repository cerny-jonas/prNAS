import { Metadata } from "next"
import Block from "@components/block"
import SecuredPage from "@components/secured_page"
import UserList from "./read_user_list"
import CreateUserForm from "./create_user_form"
import DeleteUserForm from "./delete_user_form"
import UpdateUserForm from "./update_user_form"
import { getCookies } from 'next-client-cookies/server'
import { isUserAuthenticated } from "@components/secured_page_handler"

// force SSR
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Users | prNAS",
}

const UsersPage = () => {
    const cookie_store = getCookies();
    const cookie_value = cookie_store.get("SECRET_COOKIE_PASSWORD") ?? undefined

    if (cookie_value !== undefined){
        const user_authed = isUserAuthenticated(cookie_value)

        if (!user_authed) return 1

        return (
            <>
                <Block>
                    <h3 className="text-lg font-bold">Samba Users</h3>
                    <hr className="my-2" />
                    <UserList />
                </Block>
    
                <Block>
                    <h3 className="text-lg font-bold">Create System+Samba User</h3>
                    <hr className="my-2" />
                    <CreateUserForm />
                </Block>
    
                <Block>
                    <h3 className="text-lg font-bold">Update System+Samba User</h3>
                    <hr className="my-2" />
                    <UpdateUserForm />
                </Block>
    
                <Block>
                    <h3 className="text-lg font-bold">Delete System+Samba User</h3>
                    <hr className="my-2" />
                    <DeleteUserForm />
                </Block>
            </>
        )
    }

    return (<SecuredPage></SecuredPage>)
}

export default UsersPage