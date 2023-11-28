USE [Project_Player34]
GO

/****** Object:  View [dbo].[V_Charge_Money]    Script Date: 2023-03-02 06:26:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[V_Charge_Money]
AS
SELECT        SUM(dbo.Charge_Money.Money) AS Money, dbo.Sys_Users_Detail.Sex, dbo.Sys_Users_Detail.UserID, dbo.Sys_Users_Detail.Password, dbo.Sys_Users_Detail.UserName, dbo.Sys_Users_Detail.NickName, 
                         dbo.Sys_Users_Detail.Date AS Expr3, dbo.Sys_Users_Detail.IsConsortia, dbo.Sys_Users_Detail.ConsortiaID, dbo.Sys_Users_Detail.Win, dbo.Sys_Users_Detail.Total, dbo.Sys_Users_Detail.[Escape], 
                         dbo.Sys_Users_Detail.GP, dbo.Sys_Users_Detail.Honor, dbo.Sys_Users_Detail.Gold, dbo.Sys_Users_Detail.MoneyLock, dbo.Sys_Users_Detail.Style, dbo.Sys_Users_Detail.Colors, dbo.Sys_Users_Detail.Hide, 
                         dbo.Sys_Users_Detail.Grade, dbo.Sys_Users_Detail.State, dbo.Sys_Users_Detail.IsFirst, dbo.Sys_Users_Detail.Repute, dbo.Sys_Users_Detail.LastDate, dbo.Sys_Users_Detail.ChargeDate, dbo.Sys_Users_Detail.Offer, 
                         dbo.Sys_Users_Detail.ForbidDate, dbo.Sys_Users_Detail.Skin, dbo.Sys_Users_Detail.IsExist, dbo.Sys_Users_Detail.ReputeOffer, dbo.Sys_Users_Detail.ActiveIP, dbo.Sys_Users_Detail.ExpendDate, 
                         dbo.Sys_Users_Detail.LastDateSecond, dbo.Sys_Users_Detail.LastDateThird, dbo.Sys_Users_Detail.LoginCount, dbo.Sys_Users_Detail.OnlineTime, dbo.Sys_Users_Detail.AntiAddiction, dbo.Sys_Users_Detail.AntiDate, 
                         dbo.Sys_Users_Detail.RichesOffer, dbo.Sys_Users_Detail.RichesRob, dbo.Sys_Users_Detail.UseOffer, dbo.Sys_Users_Detail.LastDayGP, dbo.Sys_Users_Detail.AddDayGP, dbo.Sys_Users_Detail.LastWeekGP, 
                         dbo.Sys_Users_Detail.AddWeekGP, dbo.Sys_Users_Detail.LastDayOffer, dbo.Sys_Users_Detail.AddDayOffer, dbo.Sys_Users_Detail.LastWeekOffer, dbo.Sys_Users_Detail.CheckCount, dbo.Sys_Users_Detail.AddWeekOffer, 
                         dbo.Sys_Users_Detail.Site, dbo.Sys_Users_Detail.IsMarried, dbo.Sys_Users_Detail.SpouseID, dbo.Sys_Users_Detail.SpouseName, dbo.Sys_Users_Detail.MarryInfoID, dbo.Sys_Users_Detail.DayLoginCount, 
                         dbo.Sys_Users_Detail.ForbidReason, dbo.Sys_Users_Detail.IsCreatedMarryRoom, dbo.Sys_Users_Detail.SelfMarryRoomID, dbo.Sys_Users_Detail.PasswordTwo, dbo.Sys_Users_Detail.IsGotRing, 
                         dbo.Sys_Users_Detail.Rename, dbo.Sys_Users_Detail.ServerName, dbo.Sys_Users_Detail.Nimbus, dbo.Sys_Users_Detail.LastAward, dbo.Sys_Users_Detail.GiftToken, dbo.Sys_Users_Detail.PvePermission, 
                         dbo.Sys_Users_Detail.QuestSite, dbo.Sys_Users_Detail.FightLabPermission, dbo.Sys_Users_Detail.FightPower, dbo.Sys_Users_Detail.LastAuncherAward, dbo.Sys_Users_Detail.AnswerSite, 
                         dbo.Sys_Users_Detail.WeaklessGuildProgressStr, dbo.Sys_Users_Detail.IsShowConsortia, dbo.Sys_Users_Detail.AchievementPoint, dbo.Sys_Users_Detail.OptionOnOff, dbo.Sys_Users_Detail.badgeID, 
                         dbo.Sys_Users_Detail.IsRecharged, dbo.Sys_Users_Detail.IsGetAward, dbo.Sys_Users_Detail.MoneyPlus, dbo.Sys_Users_Detail.evolutionGrade, dbo.Sys_Users_Detail.evolutionExp, dbo.Sys_Users_Detail.hardCurrency, 
                         dbo.Sys_Users_Detail.EliteScore, dbo.Sys_Users_Detail.CanSentMoney, dbo.Sys_Users_Detail.apprenticeshipState, dbo.Sys_Users_Detail.masterID, dbo.Sys_Users_Detail.masterOrApprentices, 
                         dbo.Sys_Users_Detail.graduatesCount, dbo.Sys_Users_Detail.honourOfMaster, dbo.Sys_Users_Detail.freezesDate, dbo.Sys_Users_Detail.ShopFinallyGottenTime, dbo.Sys_Users_Detail.charmGP, 
                         dbo.Sys_Users_Detail.Medal, dbo.Sys_Users_Detail.ChatCount, dbo.Sys_Users_Detail.SpaPubGoldRoomLimit, dbo.Sys_Users_Detail.LastSpaDate, dbo.Sys_Users_Detail.IsInSpaPubGoldToday, 
                         dbo.Sys_Users_Detail.IsInSpaPubMoneyToday, dbo.Sys_Users_Detail.LastWeekly, dbo.Sys_Users_Detail.LastWeeklyVersion, dbo.Sys_Users_Detail.IsOldPlayer, dbo.Sys_Users_Detail.Score, 
                         dbo.Sys_Users_Detail.isOldPlayerHasValidEquitAtLogin, dbo.Sys_Users_Detail.badLuckNumber, dbo.Sys_Users_Detail.luckyNum, dbo.Sys_Users_Detail.lastLuckyNumDate, dbo.Sys_Users_Detail.lastLuckNum, 
                         dbo.Sys_Users_Detail.NewDay, dbo.Sys_Users_Detail.BoxGetDate, dbo.Sys_Users_Detail.AlreadyGetBox, dbo.Sys_Users_Detail.BoxProgression, dbo.Sys_Users_Detail.GetBoxLevel, 
                         dbo.Sys_Users_Detail.AddWeekLeagueScore, dbo.Sys_Users_Detail.WeekLeagueRanking, dbo.Sys_Users_Detail.SpaPubMoneyRoomLimit, dbo.Sys_Users_Detail.LastGetEgg, dbo.Sys_Users_Detail.IsFistGetPet, 
                         dbo.Sys_Users_Detail.LastRefreshPet, dbo.Sys_Users_Detail.petScore, dbo.Sys_Users_Detail.accumulativeLoginDays, dbo.Sys_Users_Detail.accumulativeAwardDays, dbo.Sys_Users_Detail.honorId, 
                         dbo.Sys_Users_Detail.damageScores, dbo.Sys_Users_Detail.totemId, dbo.Sys_Users_Detail.myHonor, dbo.Sys_Users_Detail.MaxBuyHonor, dbo.Sys_Users_Detail.necklaceExp, dbo.Sys_Users_Detail.necklaceExpAdd, 
                         dbo.Sys_Users_Detail.GhostEquipList, dbo.Sys_Users_Detail.fineSuitExp, dbo.Sys_Users_Detail.DDPlayPoint
FROM            dbo.Charge_Money INNER JOIN
                         dbo.Sys_Users_Detail ON dbo.Charge_Money.UserName = dbo.Sys_Users_Detail.UserName
GROUP BY dbo.Sys_Users_Detail.UserID, dbo.Sys_Users_Detail.Password, dbo.Sys_Users_Detail.UserName, dbo.Sys_Users_Detail.NickName, dbo.Sys_Users_Detail.Date, dbo.Sys_Users_Detail.ConsortiaID, 
                         dbo.Sys_Users_Detail.Win, dbo.Sys_Users_Detail.Total, dbo.Sys_Users_Detail.[Escape], dbo.Sys_Users_Detail.GP, dbo.Sys_Users_Detail.Honor, dbo.Sys_Users_Detail.Gold, dbo.Sys_Users_Detail.MoneyLock, 
                         dbo.Sys_Users_Detail.Style, dbo.Sys_Users_Detail.Colors, dbo.Sys_Users_Detail.Hide, dbo.Sys_Users_Detail.Grade, dbo.Sys_Users_Detail.State, dbo.Sys_Users_Detail.IsFirst, dbo.Sys_Users_Detail.Repute, 
                         dbo.Sys_Users_Detail.LastDate, dbo.Sys_Users_Detail.ChargeDate, dbo.Sys_Users_Detail.Offer, dbo.Sys_Users_Detail.ForbidDate, dbo.Sys_Users_Detail.Skin, dbo.Sys_Users_Detail.ReputeOffer, 
                         dbo.Sys_Users_Detail.ActiveIP, dbo.Sys_Users_Detail.ExpendDate, dbo.Sys_Users_Detail.LastDateSecond, dbo.Sys_Users_Detail.LastDateThird, dbo.Sys_Users_Detail.LoginCount, dbo.Sys_Users_Detail.OnlineTime, 
                         dbo.Sys_Users_Detail.AntiAddiction, dbo.Sys_Users_Detail.AntiDate, dbo.Sys_Users_Detail.RichesOffer, dbo.Sys_Users_Detail.RichesRob, dbo.Sys_Users_Detail.UseOffer, dbo.Sys_Users_Detail.LastDayGP, 
                         dbo.Sys_Users_Detail.AddDayGP, dbo.Sys_Users_Detail.LastWeekGP, dbo.Sys_Users_Detail.AddWeekGP, dbo.Sys_Users_Detail.LastDayOffer, dbo.Sys_Users_Detail.AddDayOffer, dbo.Sys_Users_Detail.LastWeekOffer, 
                         dbo.Sys_Users_Detail.CheckCount, dbo.Sys_Users_Detail.AddWeekOffer, dbo.Sys_Users_Detail.Site, dbo.Sys_Users_Detail.SpouseID, dbo.Sys_Users_Detail.SpouseName, dbo.Sys_Users_Detail.MarryInfoID, 
                         dbo.Sys_Users_Detail.DayLoginCount, dbo.Sys_Users_Detail.ForbidReason, dbo.Sys_Users_Detail.SelfMarryRoomID, dbo.Sys_Users_Detail.PasswordTwo, dbo.Sys_Users_Detail.ServerName, dbo.Sys_Users_Detail.Nimbus, 
                         dbo.Sys_Users_Detail.LastAward, dbo.Sys_Users_Detail.GiftToken, dbo.Sys_Users_Detail.PvePermission, dbo.Sys_Users_Detail.QuestSite, dbo.Sys_Users_Detail.FightLabPermission, dbo.Sys_Users_Detail.FightPower, 
                         dbo.Sys_Users_Detail.LastAuncherAward, dbo.Sys_Users_Detail.AnswerSite, dbo.Sys_Users_Detail.WeaklessGuildProgressStr, dbo.Sys_Users_Detail.AchievementPoint, dbo.Sys_Users_Detail.OptionOnOff, 
                         dbo.Sys_Users_Detail.badgeID, dbo.Sys_Users_Detail.MoneyPlus, dbo.Sys_Users_Detail.evolutionGrade, dbo.Sys_Users_Detail.evolutionExp, dbo.Sys_Users_Detail.hardCurrency, dbo.Sys_Users_Detail.EliteScore, 
                         dbo.Sys_Users_Detail.apprenticeshipState, dbo.Sys_Users_Detail.masterID, dbo.Sys_Users_Detail.masterOrApprentices, dbo.Sys_Users_Detail.graduatesCount, dbo.Sys_Users_Detail.honourOfMaster, 
                         dbo.Sys_Users_Detail.freezesDate, dbo.Sys_Users_Detail.ShopFinallyGottenTime, dbo.Sys_Users_Detail.charmGP, dbo.Sys_Users_Detail.Medal, dbo.Sys_Users_Detail.ChatCount, 
                         dbo.Sys_Users_Detail.SpaPubGoldRoomLimit, dbo.Sys_Users_Detail.LastSpaDate, dbo.Sys_Users_Detail.LastWeekly, dbo.Sys_Users_Detail.LastWeeklyVersion, dbo.Sys_Users_Detail.Score, 
                         dbo.Sys_Users_Detail.badLuckNumber, dbo.Sys_Users_Detail.luckyNum, dbo.Sys_Users_Detail.lastLuckyNumDate, dbo.Sys_Users_Detail.lastLuckNum, dbo.Sys_Users_Detail.NewDay, dbo.Sys_Users_Detail.BoxGetDate, 
                         dbo.Sys_Users_Detail.AlreadyGetBox, dbo.Sys_Users_Detail.BoxProgression, dbo.Sys_Users_Detail.GetBoxLevel, dbo.Sys_Users_Detail.AddWeekLeagueScore, dbo.Sys_Users_Detail.WeekLeagueRanking, 
                         dbo.Sys_Users_Detail.SpaPubMoneyRoomLimit, dbo.Sys_Users_Detail.LastGetEgg, dbo.Sys_Users_Detail.LastRefreshPet, dbo.Sys_Users_Detail.petScore, dbo.Sys_Users_Detail.accumulativeLoginDays, 
                         dbo.Sys_Users_Detail.accumulativeAwardDays, dbo.Sys_Users_Detail.honorId, dbo.Sys_Users_Detail.damageScores, dbo.Sys_Users_Detail.totemId, dbo.Sys_Users_Detail.myHonor, dbo.Sys_Users_Detail.MaxBuyHonor, 
                         dbo.Sys_Users_Detail.necklaceExp, dbo.Sys_Users_Detail.necklaceExpAdd, dbo.Sys_Users_Detail.GhostEquipList, dbo.Sys_Users_Detail.fineSuitExp, dbo.Sys_Users_Detail.DDPlayPoint, dbo.Sys_Users_Detail.Sex, 
                         dbo.Sys_Users_Detail.IsConsortia, dbo.Sys_Users_Detail.IsExist, dbo.Sys_Users_Detail.IsMarried, dbo.Sys_Users_Detail.Rename, dbo.Sys_Users_Detail.IsGotRing, dbo.Sys_Users_Detail.IsShowConsortia, 
                         dbo.Sys_Users_Detail.IsRecharged, dbo.Sys_Users_Detail.IsGetAward, dbo.Sys_Users_Detail.CanSentMoney, dbo.Sys_Users_Detail.IsInSpaPubGoldToday, dbo.Sys_Users_Detail.IsInSpaPubMoneyToday, 
                         dbo.Sys_Users_Detail.IsOldPlayer, dbo.Sys_Users_Detail.isOldPlayerHasValidEquitAtLogin, dbo.Sys_Users_Detail.IsFistGetPet, dbo.Sys_Users_Detail.IsCreatedMarryRoom
GO


