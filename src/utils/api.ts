const endpoint = "https://sd51s8tlh74m0t5ldvn9g.apigateway-cn-beijing.volceapi.com/tts";

// TTS API请求参数类型
export interface TTSRequestParams {
	speaker: string; // 发音人
	ssml?: string; // ssml和text字段，至少有一个不为空
	text?: string; // ssml和text字段，至少有一个不为空
	audio_params?: {
		silence_duration?: number; // 传入文本最后添加的静音时间，范围0~30000ms
		emotion?: string; // 开心（happy），悲伤（sad），生气（angry），惊讶（surprised），恐惧（fear），厌恶（hate），激动（excited），冷漠（coldness），中性（neutral），沮丧（depressed），撒娇（lovey-dovey），害羞（shy），安慰鼓励（comfort），咆哮/焦急（tension），温柔（tender），讲故事 / 自然讲述（storytelling），情感电台（radio），磁性（magnetic），广告营销（advertising），气泡音（vocal - fry），低语 (ASMR)，新闻播报（news），娱乐八卦（entertainment），方言（dialect）
		emotion_scale?: number; // 设置情绪值，范围1~5，不设置时默认值为4
		speech_rate?: number; // 语速，取值范围[-50,100]，100代表2.0倍速，-50代表0.5倍数，默认值为0
		loudness_rate?: number; // 音量，取值范围[-50,100]，100代表2.0倍音量，-50代表0.5倍音量，默认值为0
	};
	additions?: {
		disable_markdown_filter?: boolean; // 是否开启markdown解析过滤，默认值为false
		aigc_metadata?: {
			enable?: boolean; // 是否开启AIGC元数据，默认值为false
			content_producer?: string; // AIGC内容生产者，默认值为""
		};
		post_process?: {
			pitch?: number; // 音调取值范围是[-12,12]，默认值为0
		};
		context_texts?: string[]; // 语音合成的辅助信息，用于模型对话式合成，能更好的体现语音情感，默认值为[]
		use_tag_parser?: boolean; // 是否开启标签解析，默认值为false
	};
}

// TTS API错误响应类型
export interface TTSApiError {
	detail: string;
}

/**
 * 调用TTS API合成语音
 * @param params TTS请求参数
 * @returns 合成的音频Blob对象
 */
export const synthesizeSpeech = async (req_params: TTSRequestParams): Promise<Blob> => {
	try {
		// if (req_params.additions) {
		// 	req_params.additions = JSON.stringify(req_params.additions);
		// }
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ req_params }),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw {
				detail: errorData.detail || `请求失败: ${response.status}`,
				status: response.status,
			} as TTSApiError;
		}

		return response.blob();
	} catch (error) {
		if (error instanceof Error) {
			throw {
				detail: error.message,
			} as TTSApiError;
		}
		throw error as TTSApiError;
	}
};
