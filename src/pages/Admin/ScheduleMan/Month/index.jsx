import { Calendar, Badge, Select, theme, } from 'antd';
import style from "./index.module.scss";
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
const getListData = (value) => {
    let listData;
    if (value.date() % 2 == 0) {
        listData = [
            {
                type: 'success',
                content: '李华',
            },
            {
                type: 'success',
                content: '李建',
            },
            {
                type: 'success',
                content: '李啊啊',
            },
        ];
    } else {
        listData = [{
            type: "warning",
            content: "空缺"
        }]
    }
    return listData || [];
};
const Month = () => {
    const { token } = theme.useToken();
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return (<div>
        <Calendar
            headerRender={({ value, type, onChange, onTypeChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];
                let current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                    current = current.month(i);
                    months.push(localeData.monthsShort(current));
                }
                for (let i = start; i < end; i++) {
                    monthOptions.push(
                        <Select.Option key={i} value={i} className="month-item">
                            {months[i]}
                        </Select.Option>,
                    );
                }
                const month = value.month();
                return (
                    <div style={{ padding: 8, }}>
                        <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            value={month}
                            onChange={(newMonth) => {
                                const now = value.clone().month(newMonth);
                                onChange(now);
                            }}
                        >
                            {monthOptions}
                        </Select>
                    </div>
                );
            }}
            dateCellRender={dateCellRender}
            onPanelChange={onPanelChange} />
    </div>)
};
export default Month;