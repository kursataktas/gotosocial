# 迁移

GoToSocial 支持使用 `Move` 活动进行账号迁移。

这允许你将账号迁移到你的 GoToSocial 账号，或者将你的 GoToSocial 账号迁移到其他账号。

迁移是软件无关的，因此你可以将账号迁移到其它软件或从任何支持 `Move` 活动的软件发起迁移，无论具体的软件是什么。例如，你可以将 GoToSocial 账号迁移到 Mastodon 账号，将 Mastodon 账号迁移到 GoToSocial 账号，将 GoToSocial 账号迁移到或从 Akkoma、Misskey、GoToSocial 等。

!!! tip
    根据目标账号所在软件的不同，目标账号的 URI（用于别名和迁移）应该类似于 `https://mastodon.example.org/users/account_you_are_moving_to`。如果你不确定使用哪种格式，请咨询你要迁移或设置别名的实例管理员。

!!! warning
    GoToSocial 要求 7 天的账号迁移冷却期，以防止过度切换实例（以及潜在的屏蔽规避风险）。
    
    如果任何一个发起新迁移尝试的账号在最近七天内已迁移，GoToSocial 将拒绝进行迁移，直到上一次迁移过去七天位置。

## 将你的 GoToSocial 账号迁移到其他账号（从 GoToSocial 迁移）

使用迁移账号设置，你可以将你的 GoToSocial 账号迁移到给定的目标账号 URI。

为使迁移成功：

1. 目标账号（你要迁移到的账号）必须反向别名到你当前的账号（你要从中迁移的账号）。
2. 目标账号必须可从你当前账号访问，即不被你屏蔽，不屏蔽你，未被封禁，不在你当前实例的屏蔽列表中。

迁移你的账号将从你当前账号向粉丝发送一条消息，指示他们关注目标账号。根据你的粉丝使用的服务器软件，他们可能会自动向目标账号发送关注请求，并取消关注你当前账号。

目前，**只有你的粉丝会转移到新账号**。其他如关注列表、贴文、媒体、书签、点赞、屏蔽等不会转移。

一旦你的账号迁移完成，你当前的（旧的）账号的网页视图将显示已迁移的信息，以及迁移的目标账号。

除非手动删除，否则旧账号的贴文和媒体仍可在这个已迁移的账号的网页视图中看到。如果你愿意，可以请求你迁出的实例管理员在迁移完成后封禁/删除你的账号。

如有必要，你可以使用相同的目标账号 URI 重试账号迁移。这将再次发送迁移消息。这在你的粉丝由于网络问题或其他临时故障未收到迁移消息的情况下很有用。

!!! danger "账号迁移是不可逆的永久操作！"
    
    从 GoToSocial 触发账号迁移的那一刻起，你将仅对已迁移的账号拥有基本读取和删除权限。
    
    你仍然可以登录旧账号，查看自己的贴文、点赞、收藏、屏蔽和列表。
    
    你也可以编辑个人资料，删除和/或取消置顶自己的贴文，以及取消转发、取消点赞和取消收藏。
    
    但是，你将无法执行任何涉及创建内容的操作，如创建贴文、转发、添加收藏或点赞、关注他人、上传媒体、创建列表等。
    
    此外，你将无法查看任何时间线（主页标签、公共列表），或使用搜索功能。

## 将账号迁移到你的 GoToSocial 账号（迁移到 GoToSocial）

要成功从其他账号向你的 GoToSocial 账号触发迁移，你必须首先创建一个**别名**，将你的 GoToSocial 账号链接回你要发起迁移的账号，以表明你也拥有要迁移到的 GoToSocial 账号。

为此，你必须首先使用你的 GoToSocial 账号登录 GoToSocial 设置面板。例如，如果你的 GoToSocial 实例位于 `https://example.org`，你应登录设置面板 `https://example.org/settings`。

然后，进入“迁移”部分，查看“别名账号”子部分：

![展示已填写账号别名的别名账号子部分。](../public/migration-aliasing.png)

在第一个还未填写账号别名框中，输入你希望**发起迁移**的账号的 URL。这表示你要发起迁移的账号属于你，即你“也被称为”该账号。

例如，如果你要从实例 `ondergrond.org` 上的账号 `@dumpsterqueer` 迁移，应输入 `https://ondergrond.org/@dumpsterqueer` 或 `https://ondergrond.org/users/dumpsterqueer` 作为账号别名，如上图所示。

输入别名后，点击“保存账号别名”按钮。如果一切顺利，按钮上会显示一个勾。如果不行，会显示一个错误帮助你判断出错的原因。

一旦你从 GoToSocial 账号创建了指向要发起迁移的账号的别名，你可以在另一账号所在实例的设置面板发起到你的 GoToSocial 账号的迁移。

在 Mastodon 上，“账号迁移”设置部分看起来如下：

![Mastodon “账号迁移”设置页面。](../public/migration-mastodon.png)

如果你正在从 Mastodon 账号迁移到 GoToSocial 账号，你会在“新账号代号”字段中填写 GoToSocial 账号的 `@[username]@[domain]` 值。例如，如果你的 GoToSocial 账号用户名是 `@someone`，并且在实例 `example.org` 上，那么在此处输入 `@someone@example.org`。

一旦触发从其他账号到 GoToSocial 账号的迁移，你唯一需要做的就是在新（GoToSocial）账号上接受来自旧账号粉丝的关注请求。

!!! tip
    为了省去麻烦，可以考虑在触发迁移前将 GoToSocial 账号设置为不需要批准新的关注请求。迁移完成后再开启关注请求审核。否则，你将需要手动批准每个从旧账号迁移的粉丝。

!!! tip
    迁移账号后，可能需要将之前账号的关注列表导入 GoToSocial 账号。[在此查看](./settings.md#import)如何通过设置面板完成此操作的详细信息。