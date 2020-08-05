using Microsoft.EntityFrameworkCore.Migrations;

namespace F1Ratings.Migrations
{
    public partial class AddAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'7ec43ed7-2a06-4319-abed-ea6606bf9be1', N'Admin', N'ADMIN', N'f48a3c63-4007-410f-86ff-23853a65abda')");
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'cb175de8-e394-4030-935d-f496af6042d9', N'admin', N'ADMIN', N'admin@test.com', N'ADMIN@TEST.COM', 0, N'AQAAAAEAACcQAAAAEEKnJSn7ArGR75P6KIAR1qEGL/0iLpJQunxjlxyHe5nhQPfxPyPmhFAUSyPOLylEGQ==', N'7NXYUNXTLTZ4I7B5CW3O2FJPVCLZCN64', N'702464b3-e2f1-49aa-afb6-fb85742ac007', NULL, 0, 0, NULL, 1, 0)");
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'cb175de8-e394-4030-935d-f496af6042d9', N'7ec43ed7-2a06-4319-abed-ea6606bf9be1')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
