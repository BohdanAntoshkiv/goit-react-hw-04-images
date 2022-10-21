import { Grid } from "react-loader-spinner"

export const Loader = () => {
    return (
        <Grid 
            wrapperStyle={{ justifyContent: 'center' }}
            color="#0643ad" 
            height={80} 
            width={80} 
        />
    )
}