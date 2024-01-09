import MainHeader from "@/components/layout/main-header";

export default function Layout(props){
    return (
        <>
            <MainHeader/>
            <main>
                {props.children}
            </main>
        </>
    )
}