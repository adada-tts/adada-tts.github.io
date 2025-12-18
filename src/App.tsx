import { useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	FileTextOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

import SpeechTTS from "./components/SpeechTTS";
import AdadaTTS from "./components/AdadaTTS";

function App() {
	const [collapsed, setCollapsed] = useState(true);
	const [selectedMenu, setSelectedMenu] = useState('1');
	const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

	const handleMenuClick = (e: any) => {
		setSelectedMenu(e.key);
	};

	return (
		<Layout style={{ height: "100%", minHeight: "100vh" }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[selectedMenu]}
					onClick={handleMenuClick}
					items={[
						{
							key: '1',
							icon: <FileTextOutlined />,
							label: '语音合成',
						},
						{
							key: '2',
							icon: <SmileOutlined />,
							label: '熊语合成',
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
					<div style={{ fontSize: '20px', fontWeight: 'bold' }}>
						熊熊语音合成器
					</div>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{selectedMenu === '1' && <SpeechTTS />}
					{selectedMenu === '2' && <AdadaTTS />}
				</Content>
			</Layout>
		</Layout>
	)
}

export default App;
