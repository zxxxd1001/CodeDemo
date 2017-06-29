package Enum;


public enum RcptType {
    OUTP("门诊收据"),//门诊收据
    INP("住院收据"),//住院收据
    OUTP_PREPAYMENT("门诊预交金"),//门诊预交金
    INP_PREPAYMENT("门诊预交金");//住院预交金

    private String value;

    RcptType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static RcptType fromValue(String value) throws Exception {
        for (RcptType rcptType : RcptType.values()) {
            if (rcptType.getValue().equals(value)) {
                return rcptType;
            }
        }
        throw new Exception();
    }
    public static class XmlAdapter extends javax.xml.bind.annotation.adapters.XmlAdapter<String, RcptType> {
        @Override
        public RcptType unmarshal(String v) throws Exception {
            return RcptType.fromValue(v);
        }

        @Override
        public String marshal(RcptType v) throws Exception {
            return v.getValue();
        }
    }
}
