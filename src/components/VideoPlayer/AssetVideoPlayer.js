import { useMyContext } from "../../contexts/StateHolder";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RadiantPlayer from "./RadiantPlayer.js";
import { organization } from "../../configs/config_settings.json";

const AssetVideoPlayer = (props) => {

    // Bring stateholders from context
    const { user } = useMyContext();

    // Get asseId from URL parameters
    const { asset, orgId } = useParams();

    // Stateholders for different id:s

    const [assetId, setAssetId] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [groupId, setGroupId] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        if (organization.organizationId === orgId) {
            // Set organizationId
            setOrganizationId(organization.organizationId);
            // Set companyId
            setCompanyId(organization.companyId);
            // Set groupId
            setGroupId(organization.groupId);
            // Set secretKey
            setSecretKey(organization.key);
        } else {
            // TODO: GET SUBORGANIZATION DATA FROM SOMEWHERE
            const wantedSubOrg = { organizationId: "1404509", companyId: 10154, groupId: 1404510, key: "K46JN3QxfV"}

            // Set organizationId
            setOrganizationId(wantedSubOrg.organizationId);
            // Set companyId
            setCompanyId(wantedSubOrg.companyId);
            // Set groupId
            setGroupId(wantedSubOrg.groupId);
            // Set secretKey
            setSecretKey(wantedSubOrg.key);
        }

        console.log(user);
        setUserId(user?.userId || 0);
        // Set assetId from URL parameters
        setAssetId(asset); // asset '1407203'
    }, [asset, orgId, user]);

    return (
        user && assetId !== "" ?
            <div className="maxContainer">
                <RadiantPlayer
                    companyId={companyId}
                    groupId={groupId} // Group of organization
                    organizationId={organizationId} // Id of organization
                    itemId={assetId} // AssetId to play
                    playerAutoStart={props.playerAutoStart}
                    userId={userId} // Id of user, if undefined in token, use zero
                    secretKey={secretKey} // Secret key for organization
                    backRoute={props.backRoute} // Route, where back button takes user. If undefined, it takes automatically to previous route
                    //key={assetId} // For react's re-rendering purposes
                />
            </div>
            : null
    );
}

export default AssetVideoPlayer;