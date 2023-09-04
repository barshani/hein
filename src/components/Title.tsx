interface Props {
    mainText: string;
    subText?: string;
}

function Title({ mainText, subText }: Props) {
    return (
        <h1 className="text-center my-3">
            {mainText}<br />
            {subText &&
                <small className="">
                    {subText}
                </small>
            }
        </h1>
    );
}

export default Title;