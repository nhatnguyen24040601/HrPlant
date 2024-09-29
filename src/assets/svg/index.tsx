import React from 'react';
import {SvgProps} from 'react-native-svg';

import IconAccountSelected from './icons/ic-account-selected.svg';
import IconAccountUnSelected from './icons/ic-account-unselected.svg';
import IconAccountWallet from './icons/ic-account-wallet.svg';
import IconAccount from './icons/ic-account.svg';
import IconActivitySelected from './icons/ic-activities-selected.svg';
import IconActivityUnSelected from './icons/ic-activities-unselected.svg';
import IconApp from './icons/ic-app.svg';
import IconArrowDown from './icons/ic-arrow-down.svg';
import IconArrowRight from './icons/ic-arrow-right.svg';
import IconArrowUp from './icons/ic-arrow-up.svg';
import IconBack from './icons/ic-back.svg';
import IconBalanceWallet from './icons/ic-balance-wallet.svg';
import IconBell from './icons/ic-bell.svg';
import IconBeneficiaries from './icons/ic-beneficiaries.svg';
import IconBiometric from './icons/ic-biometric.svg';
import IconCalendarWallet from './icons/ic-calendar-wallet.svg';
import IconCalendar from './icons/ic-calendar.svg';
import IconCall from './icons/ic-call.svg';
import IconCheckCircle from './icons/ic-check-circle.svg';
import IconCheckRegister from './icons/ic-check-register.svg';
import IconCheck from './icons/ic-check.svg';
import IconChevronDown from './icons/ic-chevron-down.svg';
import IconChevronLeft from './icons/ic-chevron-left.svg';
import IconChevronRight from './icons/ic-chevron-right.svg';
import IconCopy from './icons/ic-copy.svg';
import IconCreateWallet from './icons/ic-create-wallet.svg';
import IconDownload from './icons/ic-download.svg';
import IconEdit from './icons/ic-edit.svg';
import IconExchange from './icons/ic-exchange.svg';
import IconEyeOff from './icons/ic-eye-off.svg';
import IconEye from './icons/ic-eye.svg';
import IconFaceBio from './icons/ic-face-bio.svg';
import IconFilter from './icons/ic-filter.svg';
import IconFingerBio from './icons/ic-finger-bio.svg';
import IconFund from './icons/ic-fund.svg';
import IconGift from './icons/ic-gift.svg';
import IconHelp from './icons/ic-help.svg';
import IconHomeSelected from './icons/ic-home-selected.svg';
import IconHomeUnselected from './icons/ic-home-unselected.svg';
import IconKey from './icons/ic-key.svg';
import IconKYC from './icons/ic-kyc.svg';
import IconLogout from './icons/ic-logout.svg';
import IconMail from './icons/ic-mail.svg';
import IconMarker from './icons/ic-marker.svg';
import IconMenu from './icons/ic-menu.svg';
import IconOrganization from './icons/ic-organization.svg';
import IconPaperPlane from './icons/ic-paper-plane.svg';
import IconPassword from './icons/ic-password.svg';
import IconPaymentCard from './icons/ic-payment-card.svg';
import IconPaymentSend from './icons/ic-payment-send.svg';
import IconPaymentSuccess from './icons/ic-payment-success.svg';
import IconPaymentWallet from './icons/ic-payment-wallet.svg';
import IconPhone from './icons/ic-phone.svg';
import IconPlus from './icons/ic-plus.svg';
import IconReceiveMail from './icons/ic-receive-mail.svg';
import IconReceiveQR from './icons/ic-receive-qr.svg';
import IconReceive from './icons/ic-receive.svg';
import IconRecipientBank from './icons/ic-recipient-bank.svg';
import IconRecipientContainer from './icons/ic-recipient-container.svg';
import IconRecipientPhone from './icons/ic-recipient-phone.svg';
import IconRecipientWallet from './icons/ic-recipient-wallet.svg';
import IconReport from './icons/ic-report.svg';
import IconRocket from './icons/ic-rocket.svg';
import IconScan from './icons/ic-scan.svg';
import IconSearch from './icons/ic-search.svg';
import IconSendAction from './icons/ic-send-action.svg';
import IconSend from './icons/ic-send.svg';
import IconShare from './icons/ic-share.svg';
import IconSocial from './icons/ic-social.svg';
import IconSupport from './icons/ic-support.svg';
import IconSwap from './icons/ic-swap.svg';
import IconTelephone from './icons/ic-telephone.svg';
import IconTier1 from './icons/ic-tier-1.svg';
import IconTier2 from './icons/ic-tier-2.svg';
import IconTier3 from './icons/ic-tier-3.svg';
import IconTransLimit from './icons/ic-trans-limit.svg';
import IconTrashBin from './icons/ic-trash-bin.svg';
import IconTrophy from './icons/ic-trophy.svg';
import IconUser from './icons/ic-user.svg';
import IconWalletDetail from './icons/ic-wallet-detail.svg';
import IconWalletSelected from './icons/ic-wallet-selected.svg';
import IconWalletUnSelected from './icons/ic-wallet-unselected.svg';
import IconWarningCircle from './icons/ic-warning-circle.svg';
import IconWarning from './icons/ic-warning.svg';
import IconWithdraw from './icons/ic-withdraw.svg';
import IconX from './icons/ic-x.svg';

export type TNameOfIconSVG = keyof typeof IconSVG;

export const IconSVG = {
    'ic-app': IconApp,
    'ic-back': IconBack,
    'ic-chevron-right': IconChevronRight,
    'ic-organization': IconOrganization,
    'ic-chevron-down': IconChevronDown,
    'ic-home-unselected': IconHomeUnselected,
    'ic-home-selected': IconHomeSelected,
    'ic-wallet-selected': IconWalletSelected,
    'ic-wallet-unselected': IconWalletUnSelected,
    'ic-account-selected': IconAccountSelected,
    'ic-account-unselected': IconAccountUnSelected,
    'ic-activities-unselected': IconActivityUnSelected,
    'ic-send': IconSend,
    'ic-bell': IconBell,
    'ic-eye': IconEye,
    'ic-eye-off': IconEyeOff,
    'ic-plus': IconPlus,
    'ic-search': IconSearch,
    'ic-check': IconCheck,
    'ic-warning': IconWarning,
    'ic-finger-bio': IconFingerBio,
    'ic-face-bio': IconFaceBio,
    'ic-scan': IconScan,
    'ic-beneficiaries': IconBeneficiaries,
    'ic-arrow-down': IconArrowDown,
    'ic-arrow-right': IconArrowRight,
    'ic-x': IconX,
    'ic-gift': IconGift,
    'ic-activities-selected': IconActivitySelected,
    'ic-tier-1': IconTier1,
    'ic-tier-2': IconTier2,
    'ic-tier-3': IconTier3,
    'ic-mail': IconMail,
    'ic-phone': IconPhone,
    'ic-trans-limit': IconTransLimit,
    'ic-kyc': IconKYC,
    'ic-password': IconPassword,
    'ic-biometric': IconBiometric,
    'ic-help': IconHelp,
    'ic-report': IconReport,
    'ic-support': IconSupport,
    'ic-call': IconCall,
    'ic-social': IconSocial,
    'ic-logout': IconLogout,
    'ic-check-circle': IconCheckCircle,
    'ic-create-wallet': IconCreateWallet,
    'ic-calendar': IconCalendar,
    'ic-chevron-left': IconChevronLeft,
    'ic-marker': IconMarker,
    'ic-check-register': IconCheckRegister,
    'ic-rocket': IconRocket,
    'ic-balance-wallet': IconBalanceWallet,
    'ic-recipient-bank': IconRecipientBank,
    'ic-recipient-container': IconRecipientContainer,
    'ic-recipient-phone': IconRecipientPhone,
    'ic-recipient-wallet': IconRecipientWallet,
    'ic-payment-success': IconPaymentSuccess,
    'ic-payment-send': IconPaymentSend,
    'ic-payment-card': IconPaymentCard,
    'ic-payment-wallet': IconPaymentWallet,
    'ic-key': IconKey,
    'ic-trophy': IconTrophy,
    'ic-user': IconUser,
    'ic-account': IconAccount,
    'ic-receive': IconReceive,
    'ic-withdraw': IconWithdraw,
    'ic-exchange': IconExchange,
    'ic-account-wallet': IconAccountWallet,
    'ic-menu': IconMenu,
    'ic-send-action': IconSendAction,
    'ic-fund': IconFund,
    'ic-arrow-up': IconArrowUp,
    'ic-wallet-detail': IconWalletDetail,
    'ic-trash-bin': IconTrashBin,
    'ic-calendar-wallet': IconCalendarWallet,
    'ic-filter': IconFilter,
    'ic-copy': IconCopy,
    'ic-receive-qr': IconReceiveQR,
    'ic-receive-mail': IconReceiveMail,
    'ic-swap': IconSwap,
    'ic-warning-circle': IconWarningCircle,
    'ic-telephone': IconTelephone,
    'ic-edit': IconEdit,
    'ic-share': IconShare,
    'ic-download': IconDownload,
    'ic-paper-plane': IconPaperPlane,
};

function SVGIcon({
    name,
    ...props
}: {
    name: TNameOfIconSVG;
    size?: number;
} & SvgProps) {
    const SVGComponent = IconSVG[name];
    return <SVGComponent width={props.size || 24} height={props.size || 24} {...props} />;
}

export default SVGIcon;
