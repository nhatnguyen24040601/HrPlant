import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef} from 'react';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import styled from 'styled-components/native';
import SVGIcon from 'assets/svg';

interface IProps {
    height: number;
}

const BottomSheetTransaction = (props: IProps) => {
    const {height} = props;
    const bottomSheetRef = useRef<BottomSheet>(null);
    const initialSnapPoints = useMemo(() => [CommonSize.scrHeight - height - scales(20) || '25%', '90%'], [height]);

    return (
        <BottomSheet ref={bottomSheetRef} snapPoints={initialSnapPoints}>
            <SBottomSheetView>
                <Title type="s_16_24">Recent activities</Title>
                <ViewIcon>
                    <SVGIcon name="ic-activities-selected" size={scales(24)} />
                </ViewIcon>
                <EmptyText type="m_12_18">No activities to show yet</EmptyText>
            </SBottomSheetView>
        </BottomSheet>
    );
};

export default BottomSheetTransaction;

const Title = styled(Text)`
    text-align: left;
    width: 100%;
`;

const SBottomSheetView = styled(BottomSheetView)`
    padding: 0px ${scales(16)}px;
    align-items: center;
`;

const ViewIcon = styled.View`
    width: ${scales(48)}px;
    height: ${scales(48)}px;
    border-radius: ${scales(24)}px;
    background-color: ${(p) => p.theme.grey3};
    margin-top: ${scales(24)}px;
    justify-content: center;
    align-items: center;
`;

const EmptyText = styled(Text)`
    margin-top: ${scales(16)}px;
`;
