declare namespace profile {
    interface IState {
        profile: IProfile | null;
    }

    interface IItemActionProfileProps {
        label: string;
        desc?: string;
        isAction?: boolean;
        icon: import('assets/svg/index').TNameOfIconSVG;
        customColor?: string;
        customBackground?: string;
        onPress: () => void;
        showToggle?: boolean;
        showKYC?: boolean;
    }

    interface IProfile {
        userId: number;
        firstName: string;
        lastName: string;
        birthDate: string;
        email: string;
        phone: string;
        address: string;
        avatar?: string;
        country: string;
        city: string;
        state: string;
        postcode: string;
        businessId: number;
        pincode: string;
        createdDate: string;
        createdBy: number;
        updatedDate: string;
        updatedBy: number;
        accountType: import('utils/enum').TypeRegister;
        businessName: string;
        businessNumber: string;
        isFirstLogin: boolean;
    }
}
