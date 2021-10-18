import { useHistory } from "react-router-dom";

const BottomBar = (props) => {

    const history = useHistory();

    const clickTOS = () => {
        history.push(`/${props.routes.tos}`);
    }

    return (
        <div className="bottomBar" style={props.styles?.bottomBar}>
            <div className="footerLine" style={props.styles?.footerLine}></div>
            <div className="footer" style={props.styles?.footer}>
                <div className="footerInfo" style={props.styles?.footerInfo}>
                    <div className="footerInfoName" style={props.styles?.footerInfoName}>Name of Corporation</div>
                    <div className="footerInfoAddress" style={props.styles?.footerInfoAddress}>
                        Placeholder-road 123
                        <br />
                        00000 City
                        <br />
                        Country
                    </div>
                    <div className="footerInfoPhoneEmail" style={props.styles?.footerInfoPhoneEmail}>
                        123 456 789
                        <br />
                        mail@adress.com
                    </div>
                </div>
                <div
                    className="footerTos"
                    onClick={() => clickTOS()}
                    style={props.styles?.footerTos}
                > TOS
                </div>
            </div>
        </div>
    );
}

export default BottomBar;

/*
<div className="bottomBar" style={props.styles?.bottomBar}>
            <div className="footerLine" style={props.styles?.footerLine}></div>
            <div className="footer" style={props.styles?.footer}>
                <div className="footerInfo" style={props.styles?.footerInfo}>
                    <div className="footerInfoName" style={props.styles?.footerInfoName}>Nordic Content Distribution Oy</div>
                    <div className="footerInfoAddress" style={props.styles?.footerInfoAddress}>
                        Vanha talvitie 11 A
                        <br />
                        00580 Helsinki
                        <br />
                        Finland
                    </div>
                    <div className="footerInfoPhoneEmail" style={props.styles?.footerInfoPhoneEmail}>
                    tuki@kirjastokino.fi
                        <br />
                        
                    </div>
                </div>
                <div
                    className="footerTos"
                    onClick={() => clickTOS()}
                    style={props.styles?.footerTos}
                > TOS
                </div>
            </div>
        </div>
        */