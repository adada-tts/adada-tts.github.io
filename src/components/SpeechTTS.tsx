import type { TTSRequestParams } from "../utils/api";
import { useState } from "react";
import { Form, Input, Select, Button, Alert, Space } from "antd";
import { PlayCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { synthesizeSpeech } from "../utils/api";
import { downloadAudio } from "../utils/download";

interface MessageState {
	text: string;
	type: "success" | "error" | "info" | "warning" | undefined;
}

function SpeechTTS() {
	const [form] = Form.useForm<TTSRequestParams>();
	const [loading, setLoading] = useState(false);
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [audioUrl, setAudioUrl] = useState<string>("");
	const [messageState, setMessageState] = useState<MessageState>({ text: "", type: undefined });

	const handleSubmit = async (values: TTSRequestParams) => {
		setLoading(true);
		setAudioUrl("");
		setAudioBlob(null);
		setMessageState({ text: "", type: undefined });

		try {
			const blob = await synthesizeSpeech(values);
			const url = URL.createObjectURL(blob);

			setAudioBlob(blob);
			setAudioUrl(url);
			setMessageState({ text: "语音转换成功！", type: "success" });
		} catch (error) {
			const errorMsg = `错误: ${error instanceof Error ? error.message : "未知错误"}`;
			setMessageState({ text: errorMsg, type: "error" });
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = () => {
		if (audioBlob) {
			try {
				downloadAudio(audioBlob);
			} catch (error) {
				const errorMsg = `下载失败: ${error instanceof Error ? error.message : "未知错误"}`;
				setMessageState({ text: errorMsg, type: "error" });
			}
		}
	};

	return (
		<>
			<Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{
				text: "你好小熊，遇到你很高兴",
				speaker: "S_2VBHyH5N1",
			}}
			>
				<Form.Item name="text" label="输入文本" rules={[{ required: true, message: "请输入要合成的文本" }]}>
					<Input.TextArea rows={4} placeholder="请输入要合成的文本" />
				</Form.Item>

				<Form.Item name="speaker" label="语音类型">
					<Select placeholder="请选择语音类型">
						<Select.Option value="S_2VBHyH5N1">一二</Select.Option>
						<Select.Option value="S_YUBHyH5N1">布布</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading} icon={<PlayCircleOutlined />}>
						合成
					</Button>
				</Form.Item>
			</Form>
			<Space orientation="vertical" size="middle" style={{ display: "flex" }}>
				{messageState.text && (
					<Alert title={messageState.text} type={messageState.type} showIcon />
				)}
				{audioUrl && (
					<div >
						<audio src={audioUrl} controls style={{ width: "100%" }} />
						<Button style={{ marginTop: 16 }} type="primary" block icon={<DownloadOutlined />} onClick={handleDownload}>
							下载小笨音频
						</Button>
					</div>
				)}
			</Space>
		</>
	)
}

export default SpeechTTS;
